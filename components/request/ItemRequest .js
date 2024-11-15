import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import IconStyles from '../../constants/IconStyles';
import {Colors} from '../../constants/ColorStyles';

const ItemRequest = ({item, onPressInfor, onPressDetail}) => {
  const user = item?.user || {};
  const userName = user.userName || '.......';
  const userStatus = user.userStatus || '.......';
  const userImage = user.userImage || '';
  return (
    <View style={styles.itemRequest}>
      <Text style={styles.idRequest} numberOfLines={1}>
        #0000{item.id}
      </Text>
      <Text style={styles.lineRequest}></Text>
      <TouchableOpacity onPress={onPressDetail} style={styles.inforRequest}>
        <View style={styles.toRequest}>
          <Text style={styles.titleRequest} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.labelRequest} numberOfLines={1}>
            {item.amount}
          </Text>
        </View>
        <View style={styles.toFromRequest}>
          <IconStyles name="arrow-forward" />
        </View>
        <View style={styles.fromRequest}>
          <Text numberOfLines={1} style={styles.titleRequest}>
            {item.location}
          </Text>
          <Text numberOfLines={1} style={styles.labelRequest}>
            {item.date}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressInfor}
        style={[
          styles.inforUser,
          !item.user
            ? {backgroundColor: '#f0f0f0', borderRadius: 25}
            : '',
        ]}>
        <View style={styles.imgUser}>
          {!userImage ? (
            <IconStyles name="person" color={Colors.shadowPrimary} />
          ) : (
            <Image
              style={{width: 45, height: 45}}
              source={{uri: item.user.userImage}}
              resizeMode="center"
            />
          )}
        </View>
        <View style={styles.nameUser}>
          <Text
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: 12,
              color: Colors.text,
            }}
            numberOfLines={1}>
            {userName || '.......'}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontStyle: 'italic',
              fontSize: 11,
              color: Colors.textSecondary,
            }}>
            {userStatus || '.......'}
          </Text>
        </View>
        {item.user ? (
          <TouchableOpacity style={styles.detailUser}>
            <IconStyles name="chevron-forward-sharp" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.success,
              paddingHorizontal: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Tìm kiếm</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRequest: {
    paddingHorizontal: 20,
  },
  idRequest: {
    fontSize: 11,
  },
  lineRequest: {
    borderBottomWidth: 1,
    color: Colors.shadowPrimary,
    height: 5,
    marginHorizontal: 20,
  },
  inforRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  toRequest: {
    width: '30%',
  },
  toFromRequest: {},
  fromRequest: {},
  titleRequest: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 16,
    marginVertical: 5,
  },
  labelRequest: {
    color: Colors.textPrimary,
    fontSize: 13,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  inforUser: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgUser: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    flex: 2,
    marginHorizontal: 15,
  },
  detailUser: {
    width: 35,
    height: 35,
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemRequest;
