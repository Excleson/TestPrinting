import * as React from 'react';
import { Platform, Button, View, StyleSheet, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const openDocumentPrint = () => {
    DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    })
      .then((data) => {
        if (data.type === 'success') {
          if (Platform.OS === 'android') {
              const FLAG_GRANT_READ_URI_PERMISSION = 1;
              IntentLauncher.startActivityAsync('android.intent.action.SEND', {
                type: 'application/pdf',
                flags: FLAG_GRANT_READ_URI_PERMISSION,
                extra: {"src":"pkb","dbId":"10101010"},
                data: data.uri,
                packageName: 'id.astra.zebraprint',
                className: 'id.astra.zebraprint.MainActivity',
              }).catch((e) => {
                ToastAndroid.show('Application not found!', ToastAndroid.SHORT);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <Button title="Open Document and Print" onPress={openDocumentPrint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
