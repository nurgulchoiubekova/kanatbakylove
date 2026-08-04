export interface RSVPResponse {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  submittedAt: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  subTitle?: string;
  iconName: 'users' | 'rings' | 'utensils' | 'sparkles' | 'glass';
}
