import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  itemMainBox: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10, // Radio de las esquinas redondeadas
    borderWidth: 1, // Ancho del borde
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  contentBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  box1: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 3,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  box2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Servicetitle: {
    fontSize: 21,
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1}, // Desplazamiento del borde
    textShadowRadius: 10, // Radio del borde
    textAlign: 'center', // Alinea el texto en el centro horizontalmente
    marginRight: 2,
  },
  leftImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 25, // Opcional: para imágenes redondeadas
    borderWidth: 2, // Ancho del borde
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  reserveBtn: {
    marginTop: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.985)',
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
  priceTxt: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
