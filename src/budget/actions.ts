import { ActionBase } from "../types/global";

export enum BudgetActions {
  SetBudget = "Budget.SetBudget"
}

export class SetBudget implements ActionBase {
  readonly type = BudgetActions.SetBudget;
  constructor(public amount: number) {}
}

export type BudgetActionType = SetBudget;
