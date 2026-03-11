import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { sendMessageToGroq, loadChatHistory, saveChatHistory, clearChatHistory } from '../services/aiService';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    (async () => {
      const history = await loadChatHistory();
      if (history && history.length > 0) {
        setMessages(history);
      } else {
        setMessages([{ role: "assistant", content: "Olá! Eu sou a sua assistente Hallel. Como você está se sentindo hoje?" }]);
      }
    })();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = { role: "user", content: inputText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setLoading(true);

    const replyText = await sendMessageToGroq(inputText, messages);
    const updatedMessages = [...newMessages, { role: "assistant", content: replyText }];
    
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);
    setLoading(false);
  };

  const handleClear = () => {
    clearChatHistory();
    setMessages([{ role: "assistant", content: "Histórico apagado. Como posso ajudar agora?" }]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <View className="flex-row items-center justify-between p-4 border-b border-white/10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Assistente Hallel</Text>
        <TouchableOpacity onPress={handleClear} className="p-2 bg-rose-500/20 rounded">
          <Text className="text-rose-400 text-xs font-bold">Limpar</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView 
            className="flex-1 px-4 py-4"
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, idx) => (
             <View key={idx} className={`rounded-2xl p-4 mb-4 max-w-[85%] ${msg.role === 'user' ? 'bg-primary self-end rounded-tr-sm' : 'bg-white/10 self-start rounded-tl-sm'}`}>
                <Text className="text-white text-base">{msg.content}</Text>
             </View>
          ))}
          {loading && (
             <View className="bg-white/10 self-start rounded-2xl rounded-tl-sm p-4 mb-4">
                <ActivityIndicator color="#6366f1" size="small" />
             </View>
          )}
        </ScrollView>
        
        <View className="p-4 border-t border-white/10 flex-row items-center">
          <TextInput 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white mr-2"
            placeholder="Digite algo..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend} disabled={loading} className={`h-12 w-12 rounded-full items-center justify-center ${loading || !inputText.trim() ? 'bg-primary/50' : 'bg-primary'}`}>
            <Text className="text-white">→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
