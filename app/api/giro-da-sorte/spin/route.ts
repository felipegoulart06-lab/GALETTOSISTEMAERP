import { NextResponse } from "next/server";
import { getPlatformDb, savePlatformDb } from "@/lib/platform-store";
import type { SpinRewardRecord, SpinWheelRecord, SpinHistoryRecord, SpinWinnerRecord } from "@/lib/platform-types";

export async function POST(request: Request) {
  try {
    const { wheelId } = await request.json();
    const db = await getPlatformDb();
    
    // Encontra a roleta
    const wheelIndex = db.spinWheels.findIndex(w => w.id === wheelId);
    if (wheelIndex === -1) {
      return NextResponse.json({ error: "Roleta não encontrada" }, { status: 404 });
    }
    
    const wheel = db.spinWheels[wheelIndex];
    
    // Verifica giros disponíveis
    if (wheel.availableSpins <= 0) {
      return NextResponse.json({ error: "Sem giros disponíveis" }, { status: 400 });
    }
    
    // Filtra recompensas com estoque
    const availableRewards = wheel.rewards.filter(r => r.quantityAvailable > 0 && r.status === "ATIVO");
    if (availableRewards.length === 0) {
      return NextResponse.json({ error: "Nenhuma recompensa disponível no momento" }, { status: 400 });
    }
    
    // Algoritmo de sorteio por probabilidade
    const totalProb = availableRewards.reduce((sum, r) => sum + r.probability, 0);
    let random = Math.random() * totalProb;
    let selectedReward: SpinRewardRecord | null = null;
    let selectedIndex = -1;
    
    for (let i = 0; i < availableRewards.length; i++) {
      random -= availableRewards[i].probability;
      if (random <= 0) {
        selectedReward = availableRewards[i];
        // Encontra o index real no array original de rewards da wheel
        selectedIndex = wheel.rewards.findIndex(r => r.id === selectedReward?.id);
        break;
      }
    }
    
    if (!selectedReward || selectedIndex === -1) {
      // Fallback para o primeiro se algo der errado no loop
      selectedReward = availableRewards[0];
      selectedIndex = wheel.rewards.findIndex(r => r.id === selectedReward.id);
    }
    
    // Atualiza estoque da recompensa
    wheel.rewards[selectedIndex].quantityAvailable -= 1;
    if (wheel.rewards[selectedIndex].quantityAvailable <= 0) {
      wheel.rewards[selectedIndex].status = "ESGOTADO";
    }
    
    // Atualiza status da roleta
    wheel.availableSpins -= 1;
    wheel.totalPrizesWon += 1;
    
    // Registra no histórico
    const rewardCode = `WIN-${Math.random().toString(36).toUpperCase().slice(2, 10)}`;
    const historyEntry: SpinHistoryRecord = {
      id: globalThis.crypto.randomUUID(),
      userId: "user-123", // Em produção viria da sessão
      userNameMasked: "Felipe G.",
      wheelTitle: wheel.title,
      resultLabel: "GANHOU",
      rewardTitle: selectedReward.title,
      status: "ATIVO",
      internalCode: rewardCode,
      playedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
    };
    
    if (!wheel.history) wheel.history = [];
    wheel.history.unshift(historyEntry);
    
    // Registra como vencedor recente
    const winnerEntry: SpinWinnerRecord = {
      id: globalThis.crypto.randomUUID(),
      userNameMasked: "Felipe G.",
      rewardTitle: selectedReward.title,
      wheelTitle: wheel.title,
      wonAt: new Date().toISOString(),
      tone: wheel.visualTone || "blue"
    };
    
    if (!wheel.recentWinners) wheel.recentWinners = [];
    wheel.recentWinners.unshift(winnerEntry);
    if (wheel.recentWinners.length > 10) wheel.recentWinners.pop();
    
    // Salva DB
    await savePlatformDb(db);
    
    // Calcula ângulo para o cliente
    // A animação no cliente deve parar exatamente na fatia do selectedIndex
    const sliceAngle = 360 / wheel.rewards.length;
    // O ângulo retornado deve ser relativo ao ponto inicial (ponteiro no topo)
    // Se o index 0 está no topo, o ângulo é 0. 
    // Para cair no index I, a roleta deve girar (360 - I * sliceAngle - sliceAngle/2)
    const finalAngle = 360 - (selectedIndex * sliceAngle + sliceAngle / 2);
    
    return NextResponse.json({
      success: true,
      reward: selectedReward,
      angle: finalAngle,
      rewardCode,
      availableSpins: wheel.availableSpins
    });
    
  } catch (error) {
    console.error("Erro no giro da sorte:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
