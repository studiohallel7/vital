import AsyncStorage from '@react-native-async-storage/async-storage';

// Nota p/ ambiente de Produção: Mova a chave para variáveis de ambiente (ex: react-native-dotenv)
const GROQ_API_KEY = "COLOQUE_SUA_CHAVE_AQUI"; 
const MODEL = "llama3-8b-8192";
const STORAGE_KEY = "@hallel_chat_history";

const SYSTEM_PROMPT = {
  role: "system",
  content: "Você é a Alana, uma assistente virtual de psicologia empática, acolhedora e amigável do app Hallel. Você não prescreve medicamentos e não dá diagnósticos clínicos. Seu objetivo é ouvir o paciente atentamente, fornecer apoio emocional pontual, sugerir técnicas de relaxamento ou grounding (como aterramento 5-4-3-2-1) quando o paciente estiver ansioso, e se colocar no papel de uma amiga compreensiva. Se o caso for grave, sugira procurar o botão de Emergência ou falar com o psicólogo do aplicativo. Responda sempre em português, de forma concisa e natural no formato de chat de celular."
};

export async function loadChatHistory() {
  try {
    const history = await AsyncStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (e) {
    console.error("Erro ao carregar histórico", e);
    return [];
  }
}

export async function saveChatHistory(messages) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error("Erro ao salvar histórico", e);
  }
}

export async function clearChatHistory() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function sendMessageToGroq(userText, currentHistory = []) {
  if (!GROQ_API_KEY || GROQ_API_KEY === "COLOQUE_SUA_CHAVE_AQUI") {
    return "A chave da API do Groq não foi configurada. Por favor, adicione-a no arquivo aiService.js.";
  }

  const userMessage = { role: "user", content: userText };
  const messagesToSend = [SYSTEM_PROMPT, ...currentHistory, userMessage];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messagesToSend,
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Groq API Error:", errorData);
        throw new Error("Erro na API de IA");
    }

    const data = await response.json();
    const assistantContent = data.choices[0].message.content;
    
    return assistantContent;
  } catch (error) {
    console.error("Erro ao comunicar com a IA:", error);
    return "Desculpe, estou enfrentando problemas técnicos para me conectar agora. Tente novamente mais tarde.";
  }
}
