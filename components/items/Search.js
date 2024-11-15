import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {Colors} from '../../constants/ColorStyles';
import {FontFamily} from '../../constants/Fonts';
import ButtonIcons from './ButtonIcons';
const {width, height} = Dimensions.get('window');

const Search = ({onSuggestionSelect}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchLocation = async query => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 5,
          },
        },
      );
      setSuggestions(response.data);
      const result = response.data[0];
      const location = {
        latitude: result.lat,
        longitude: result.lon,
      };
      // Gọi hàm onsubmit để trả dữ liệu về component cha
      // handleSelectSuggestion(location.latitude, location.longitude);
    } catch (error) {
      // Alert.alert('Địa chỉ không tồn tại');
    }
  };

  const handleSelectSuggestion = (latitude, longitude) => {
    const selectedLocation = {latitude, longitude};
    onSuggestionSelect(selectedLocation);
    setSuggestions([]);
    setSearchQuery('');
  };

  const onSubmit = data => {
    const query = data.location.trim();
    if (query) {
      searchLocation(query);
      setSearchQuery(query);
      setSuggestions([]); // Clear suggestions on submit
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchLocation(searchQuery);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContai}>
        <ButtonIcons
          nameIcon="search"
          sizeIcon={27}
          colorIcon={Colors.primary800}
        />
        <Controller
          control={control}
          rules={{required: 'Location is required'}}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(text);
                  setSearchQuery(text); // Update search query as user types
                }}
                value={value}
                placeholder="Tìm kiếm địa điểm"
                autoCapitalize="none"
                returnKeyType="search"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            </View>
          )}
          name="location"
          defaultValue=""
        />
      </View>
      {suggestions.length > 0 && (
        <View style={styles.suggestioContai}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectSuggestion(item.lat, item.lon)}
                style={styles.suggestionItem}>
                <Text style={[styles.display_name, {fontWeight: 'bold'}]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.display_name,
                    {
                      fontFamily: FontFamily.italic,
                      fontSize: 14,
                      color: Colors.textSecondary,
                    },
                  ]}>
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    // width: '80%',
  },
  searchContai: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 0},
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 8,
    fontSize: 15,
    fontStyle: 'italic',
    backgroundColor: '#fff',
  },
  suggestioContai: {
    position: 'absolute',
    top: 60,
    borderRadius: 15,
    // height: '100%',
    width: width - 20,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    width: '100%',
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textPrimary,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  display_name: {
    fontSize: 18,
    color: '#000',
    marginVertical: 2,
  },
});

export default Search;
