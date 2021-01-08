import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';

import {
  ActivityIndicator,
  BackHandler,
  RefreshControl,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LineChart, LineValue} from 'react-native-charts-wrapper';

import {BasicHeader} from 'src/components/header/BasicHeader';
import {ScrollView} from 'react-native-gesture-handler';

import {AuthContext} from 'src/context/Auth';

import {GET_PROFILE, GET_TRANSACTION} from 'src/queries/Dashboard';
import {useFocusEffect} from '@react-navigation/native';

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const {signOut} = useContext(AuthContext);

  const {
    loading: loading_user,
    error: error_user,
    data: data_user,
    refetch: refetch_user,
  } = useQuery(GET_PROFILE);
  const {
    loading: loading_transaction,
    error: error_transaction,
    data: data_transaction,
    refetch: refetch_transaction,
  } = useQuery(GET_TRANSACTION);

  useFocusEffect(
    React.useCallback(() => {
      let currentCount = 0;
      const onBackPress = () => {
        if (currentCount < 1) {
          currentCount += 1;
          ToastAndroid.showWithGravity(
            'Press again to close!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          BackHandler.exitApp();
          // exit the app here using BackHandler.exitApp();
        }
        setTimeout(() => {
          currentCount = 0;
        }, 1500);

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const data_array: (number | LineValue)[] | undefined = [];
  for (const key in data_transaction?.getCurrentUserTransaction) {
    data_array.push({
      x: Number(key),
      y: Number(data_transaction.getCurrentUserTransaction[key].payment_amount),
    });
  }

  if (error_user?.message || error_transaction?.message === 'Invalid Token') {
    signOut();
  }

  return (
    <Div style={{backgroundColor: '#fff', height: hp('100%')}}>
      <BasicHeader title="DASHBOARD" />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              refetch_transaction();
              refetch_user();
            }}
            refreshing={loading_transaction || loading_user}
            colors={['#4299e1']}
          />
        }>
        <Div m={10} h={hp('40%')}>
          {error_user && (
            <Text fontWeight="bold" fontSize="2xl">
              Something went wrong...
            </Text>
          )}
          {Boolean(loading_user) ? (
            <ActivityIndicator color="#be1e2d" size={30} />
          ) : data_user ? (
            <>
              <Text fontWeight="bold" fontSize="2xl" color="#be1e2d">
                Rp.{' '}
                {Number(data_user?.getUser?.balance).toLocaleString(undefined)}
              </Text>
              <Text color="#158cba">Jumlah saldo saat ini</Text>
            </>
          ) : null}
        </Div>
        <Div m={10} h={hp('40%')}>
          {error_transaction && (
            <Text fontWeight="bold" fontSize="2xl">
              Something went wrong...
            </Text>
          )}
          {Boolean(loading_transaction) ? (
            <ActivityIndicator color="#be1e2d" size={30} />
          ) : data_transaction ? (
            <LineChart
              style={{height: '100%', margin: 10}}
              data={{
                dataSets: [
                  {
                    label: 'Jumlah dukungan dalam 30 hari terakhir',
                    values: data_array || [{x: 10, y: 20}],
                  },
                ],
              }}
              chartDescription={{text: ''}}
              // legend={this.state.legend}
              // marker={this.state.marker}
              // xAxis={this.state.xAxis}
              drawGridBackground={false}
              // borderColor={processColor('teal')}
              borderWidth={1}
              drawBorders={true}
              autoScaleMinMaxEnabled={false}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              scaleXEnabled={true}
              scaleYEnabled={true}
              pinchZoom={true}
              doubleTapToZoomEnabled={true}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              // visibleRange={this.state.visibleRange}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              // ref="chart"
              keepPositionOnRotation={false}
              // onSelect={this.handleSelect.bind(this)}
              // onChange={(event) => console.log(event.nativeEvent)}
            />
          ) : null}
        </Div>
      </ScrollView>
    </Div>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
