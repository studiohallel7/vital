import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function FirstAidScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <View className="flex-row items-center justify-between p-4 border-b border-white/10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Primeiros Socorros</Text>
        <View className="w-10"></View>
      </View>
      
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-3xl font-extrabold text-white mb-2">Como você está se sentindo?</Text>
        <Text className="text-white/70 text-sm mb-6">Selecione um cenário para ver como agir.</Text>
        
        {/* Scenario Card Placeholder */}
        <View className="bg-white/5 rounded-xl p-5 mb-4 border border-white/10">
          <View className="flex-row items-center gap-3">
            <Text className="text-primary text-2xl">🧠</Text>
            <Text className="text-white font-bold text-lg">Ataque de Pânico</Text>
          </View>
        </View>

        <View className="bg-white/5 rounded-xl p-5 mb-4 border border-white/10">
          <View className="flex-row items-center gap-3">
            <Text className="text-primary text-2xl">⚡</Text>
            <Text className="text-white font-bold text-lg">Crise de Ansiedade</Text>
          </View>
        </View>
      </ScrollView>

      <View className="p-4 pt-2">
        <TouchableOpacity className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-primary">
          <Text className="text-white font-bold text-base">Preciso de Ajuda Agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
