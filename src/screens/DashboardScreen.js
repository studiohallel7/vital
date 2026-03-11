import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <StatusBar barStyle="light-content" backgroundColor="#121214" />
      <View className="flex-1 px-4 py-6">
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-white text-3xl font-extrabold leading-tight">Olá, Alana</Text>
            <Text className="text-white/60 text-sm mt-1">Bem-vinda de volta ao Hallel.</Text>
          </View>
          <View className="h-12 w-12 rounded-full bg-white/10 items-center justify-center">
            <Text className="text-white text-lg">👩‍⚕️</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity 
            className="w-[48%] bg-white/5 rounded-2xl p-4 mb-4 border border-white/10"
            onPress={() => navigation.navigate('Chat')}
          >
            <Text className="text-primary text-3xl mb-2">💬</Text>
            <Text className="text-white font-bold text-lg">Conversar</Text>
            <Text className="text-white/50 text-xs mt-1">Falar com a assistente virtual</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-[48%] bg-white/5 rounded-2xl p-4 mb-4 border border-white/10"
            onPress={() => navigation.navigate('VideoCall')}
          >
            <Text className="text-emerald-400 text-3xl mb-2">📹</Text>
            <Text className="text-white font-bold text-lg">Videochamada</Text>
            <Text className="text-white/50 text-xs mt-1">Falar com o psicólogo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full bg-rose-500/20 rounded-2xl p-4 border border-rose-500/30 flex-row items-center"
            onPress={() => navigation.navigate('FirstAid')}
          >
            <View className="bg-rose-500/20 h-10 w-10 rounded-full items-center justify-center mr-3">
              <Text className="text-rose-400 text-xl">⚡</Text>
            </View>
            <View className="flex-1">
              <Text className="text-rose-400 font-bold text-lg">Primeiros Socorros</Text>
              <Text className="text-rose-200/50 text-xs mt-0.5">Ataque de pânico, crise, exaustão</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
