
export interface ValentineState {
  recipient: string;
  sender: string;
  isAccepted: boolean;
}

export enum Page {
  FORM = 'form',
  INVITE = 'invite',
  SUCCESS = 'success'
}
