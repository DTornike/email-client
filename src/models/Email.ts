export interface Email {
  id: number;
  subject: string;
  body: string;
  sender: number;
  recipients: number[];
  sent_at?: string;
  is_read?: boolean;
  attachment?: string;
}

export interface EmailResponse extends Omit<Email, "attachment"> {
  attachment?: {
    type: string;
    name: string;
    url: string;
  };
}
