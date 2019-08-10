import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    //  const tron = Reactotron.configure({ host: '192.168.0.2' }) // via usb
    .useReactNative()
    .connect();

  console.tron = tron; // vai executar o console quando chamar console.tron

  tron.clear(); // limpa o console qnd reinicia a app
}
