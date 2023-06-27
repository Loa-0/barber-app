import React from 'react';
import {insertEvent} from '../../api/http';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {useContext} from 'react';
import {ServiceContext} from '../../context/Service.Context';
import {EventPayload} from '../../interfaces/Appointments';
import {ThemeContext} from '../../context/ThemeContext';
import {displayDate, mostrarHora} from '../../helpers/Date';
import {AgendaContext} from '../../hooks/useCalendar';

interface Props {
  closeModalConfirm: () => void;
  dataDate: {data: string; startD: string; endDate: string};
  closeList: () => void;
}

export const ModalConfirm = ({
  closeModalConfirm,
  dataDate,
  closeList,
}: Props) => {
  const {servicesFinal, setInitialServices} = useContext(ServiceContext);
  const {loadAgenda} = useContext(AgendaContext);
  const {
    themeState: {colors, highlightColor, bulletFree},
  } = useContext(ThemeContext);

  const constructPetition = () => {
    if (servicesFinal.services.length > 0) {
      const serv: String[] = servicesFinal.services.map(ser => {
        return `${ser.title} - Costo = $${ser.price}`;
      });

      const servString = serv.join(', ');
      const payload: EventPayload = {
        summary: 'Isaac',
        description: `Costo Total: ${servicesFinal.totalCost}\nServicos: ${servString}`,
        start: servicesFinal.start,
        end: servicesFinal.end,
        email: 'vazisaac9508@gmail.com',
      };
      try {
        console.log('pay', payload);
        insertEvent(payload);
        ToastAndroid.showWithGravityAndOffset(
          'Registro Exitoso',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
        closeModalConfirm();
        loadAgenda(
          {
            day: 0,
            month: 0,
            timestamp: 0,
            year: 0,
            dateString: dataDate.data,
          },
          true,
        );
        setInitialServices();
        closeList();
      } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(
          'Error, Intentalo mas tarde',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      }
    }
  };
  return (
    <View
      style={{
        ...styles.modalContainer,
        backgroundColor: bulletFree,
        borderColor: highlightColor,
      }}>
      <>
        <View
          style={{
            ...styles.titleContainer,
          }}>
          <Text style={{...styles.titleText, color: colors.text}}>
            Confirmar
          </Text>
          <TouchableNativeFeedback
            onPress={() => {
              closeModalConfirm();
            }}>
            <Icon
              name="close-circle"
              size={25}
              color={colors.text}
              style={styles.icon}
            />
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            ...styles.dataContainer,
            backgroundColor: colors.background,
            shadowColor: colors.text,
          }}>
          <View style={styles.dataFirstText}>
            <Text>
              Tiempo Aproximado: {mostrarHora(servicesFinal.totalDuration)}
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={styles.titleText}>Fecha:</Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text>{displayDate(dataDate.data)}</Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={styles.bold}>
              De: {dataDate.startD} a: {dataDate.endDate}{' '}
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={styles.titleText}>Servicios:</Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text>
              {servicesFinal.services
                .map(
                  ser =>
                    `${ser.title} - ${mostrarHora(ser.duration)} - $${
                      ser.price
                    }\n`,
                )
                .join('\n')}
            </Text>
          </View>
          <Pressable
            style={{...styles.btnConfirm, backgroundColor: bulletFree}}
            onPress={constructPetition}>
            <Text style={{color: colors.text}}>Confirmar</Text>
          </Pressable>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '85%',
    height: '50%',
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
    alignContent: 'center',
    borderWidth: 3,
    borderRadius: 20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  icon: {right: 10, marginTop: 10, position: 'absolute'},
  dataContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 1.27,
    elevation: 3,
  },
  dataFirstText: {flexDirection: 'row', marginBottom: 10},
  bold: {
    fontWeight: 'bold',
  },
  btnConfirm: {
    marginTop: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    padding: 10,
  },
});
