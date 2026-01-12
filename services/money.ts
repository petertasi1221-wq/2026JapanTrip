import { Expense, User, Balance } from '../types';

export const calculateSettlements = (expenses: Expense[], users: User[]): Balance[] => {
  const balances: Record<string, number> = {};

  // Initialize balances
  users.forEach(u => balances[u.id] = 0);

  // Calculate net balance for each person
  expenses.forEach(expense => {
    const paidBy = expense.payerId;
    const amount = expense.amount;
    const splitCount = expense.involvedUserIds.length;
    
    if (splitCount === 0) return;

    const share = amount / splitCount;

    // Payer gets positive balance (they are owed money)
    balances[paidBy] = (balances[paidBy] || 0) + amount;

    // Participants get negative balance (they owe money)
    expense.involvedUserIds.forEach(userId => {
      balances[userId] = (balances[userId] || 0) - share;
    });
  });

  // Separate into debtors (owe money) and creditors (owed money)
  let debtors: { id: string, amount: number }[] = [];
  let creditors: { id: string, amount: number }[] = [];

  Object.entries(balances).forEach(([id, amount]) => {
    // Floating point correction
    const cleanAmount = Math.round(amount * 100) / 100;
    if (cleanAmount < -0.01) debtors.push({ id, amount: cleanAmount });
    if (cleanAmount > 0.01) creditors.push({ id, amount: cleanAmount });
  });

  // Sort by magnitude to optimize transactions
  debtors.sort((a, b) => a.amount - b.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements: Balance[] = [];

  let i = 0; // debtor index
  let j = 0; // creditor index

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    // The amount to settle is the minimum of what debtor owes and creditor is owed
    const amount = Math.min(Math.abs(debtor.amount), creditor.amount);

    settlements.push({
      fromUserId: debtor.id,
      toUserId: creditor.id,
      fromUser: users.find(u => u.id === debtor.id)?.name || 'Unknown',
      toUser: users.find(u => u.id === creditor.id)?.name || 'Unknown',
      amount: Math.round(amount * 100) / 100
    });

    // Adjust remaining balances
    debtor.amount += amount;
    creditor.amount -= amount;

    // If settled, move to next
    if (Math.abs(debtor.amount) < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return settlements;
};