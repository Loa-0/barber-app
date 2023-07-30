import React, {useState} from 'react';
import {insertEvent} from '../../api/http';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Pressable,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useContext} from 'react';
import {ServiceContext} from '../../context/Service.Context';
import {EventPayload} from '../../interfaces/Appointments';
import {ThemeContext} from '../../context/ThemeContext';
import {displayDate, mostrarHora} from '../../helpers/Date';
import {AgendaContext} from '../../hooks/useCalendar';
import {EmailNameForm} from './EmailInput';
import {AuthContext} from '../../context/AuthContext';

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
  const {clientUserState} = useContext(AuthContext);
  const {loadAgenda} = useContext(AgendaContext);
  const {
    themeState: {colors, highlightColor, bulletFree},
  } = useContext(ThemeContext);

  const [name, setName] = useState(clientUserState.name);

  const constructPetition = () => {
    if (servicesFinal.services.length > 0) {
      if (name.length === 0) {
        Alert.alert('Error', 'Faltan Campos Requeridos');
        return;
      }
      const serv: String[] = servicesFinal.services.map(ser => {
        return `${ser.title} - Costo = $${ser.price}`;
      });

      const servString = serv.join(', ');
      const payload: EventPayload = {
        summary: name,
        description: `Costo Total: ${servicesFinal.totalCost}\nServicos: ${servString}`,
        start: servicesFinal.start,
        end: servicesFinal.end,
        email: clientUserState.email.toString().trim().toLowerCase(),
      };
      try {
        insertEvent(payload);
        ToastAndroid.showWithGravityAndOffset(
          'Cita agendada, revisa tu calendario de Google',
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
            Datos de la Cita
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
          <View
            style={[
              styles.dataFirstText,
              {...styles.borderBott, borderBottomColor: highlightColor},
            ]}>
            <Text style={{...styles.fontEmail, color: colors.text}}>
              Email: {clientUserState.email}
            </Text>
          </View>
          <View style={[styles.dataFirstText]}>
            <Text style={{color: colors.text}}>
              Tiempo Aproximado: {mostrarHora(servicesFinal.totalDuration)}
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={{...styles.titleText, color: colors.text}}>
              Fecha:
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={{color: colors.text}}>
              {displayDate(dataDate.data)}
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={{...styles.bold, color: colors.text}}>
              De: {dataDate.startD} a: {dataDate.endDate}{' '}
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={{...styles.titleText, color: colors.text}}>
              Servicios:
            </Text>
          </View>
          <View style={styles.dataFirstText}>
            <Text style={{color: colors.text}}>
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
          <View style={styles.dataFirstText}>
            <Text style={{...styles.titleText, color: colors.text}}>
              Total: ${servicesFinal.totalCost}
            </Text>
          </View>
          <EmailNameForm setName={setName} name={name} />
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
  borderBott: {
    borderBottomWidth: 3,
    padding: 10,
  },
  fontEmail: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    width: '85%',
    height: '70%',
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
