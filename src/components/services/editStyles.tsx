import {StyleSheet} from 'react-native';
import {globalColors} from '../../theme/AppStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row', // Para alinear la imagen y el texto horizontalmente
    alignItems: 'center', // Para centrar verticalmente la imagen y el texto
    borderRadius: 10, // Radio de las esquinas redondeadas
    borderWidth: 1, // Ancho del borde
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 22,
    textShadowOffset: {width: 1, height: 1}, // Desplazamiento del borde
    textShadowRadius: 1, // Radio del borde
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 25, // Opcional: para imágenes redondeadas
    borderWidth: 1, // Ancho del borde
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'black',
  },
  newButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  newButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    marginVertical: 5,
    marginLeft: 16,
  },
  price: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24, // Ajusta el valor según sea necesario
    alignItems: 'center',
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'rgba(255,255,255,0.985)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: 'rgb(218,165,32)',
    borderWidth: 2, // Agregado para el borde negro
  },
  modalViewPic: {
    //margin: 50,
    //borderRadius: 20,
    //padding: 35,
    alignItems: 'center',
    backgroundColor: 'transparent', // Fondo transparente
    borderColor: 'transparent', // Borde transparente
    borderWidth: 1, // Puedes ajustar el ancho del borde si lo deseas
  },
  buttonClose: {
    backgroundColor: 'rgb(130,130,130)',
    borderColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  reservationBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
  },
  reservationText: {
    color: 'white',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 22,
    resizeMode: 'cover',
  },
  formTitle: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  formTitleText: {
    fontSize: 22,
    textShadowOffset: {width: 1, height: 1}, // Desplazamiento del borde
    textShadowRadius: 1, // Radio del borde
  },
  goBackArrowPos: {
    position: 'absolute',
    left: 0,
  },
  goBackWrapper: {
    padding: 10, // Ajusta el padding según tu preferencia para aumentar el área tocable
  },
  formImageContainer: {
    alignItems: 'center',
    marginVertical: 22,
  },
  formImage: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
  },
  formCameraPos: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  formInputContainer: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  formTextBox: {
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
    height: 44,
    width: '100%',
  },
  formSubmitBtn: {
    marginVertical: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 13,
    color: globalColors.disabledRed,
  },
});
