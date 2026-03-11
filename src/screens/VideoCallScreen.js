import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoCallScreen({ navigation }) {
  // Configuração da sala única do paciente com o psicólogo
  const roomUrl = 'https://p2p.mirotalk.com/join/hallel-room-alana';

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <View className="flex-row items-center justify-between p-4 border-b border-white/10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Consulta Online</Text>
        <View className="w-10"></View>
      </View>
      
      <View className="flex-1">
        <WebView 
          source={{ uri: roomUrl }} 
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          className="flex-1 bg-background-dark"
        />
      </View>
    </SafeAreaView>
  );
}
