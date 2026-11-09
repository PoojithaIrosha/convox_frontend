export interface Conversation {
  id: string;
  customer: CustomerProfile;
  status: ConversationStatus;
  lastMessagePreview: string;
  lastMessageDirection: MessageDirection;
  lastMessageAt: Date;
  lastInboundAt: Date;
  integration: Integration;
  unreadCount: number;
}

export interface CustomerProfile {
  id: string;
  name: string;
  mobile: string;
  profilePic: string;
}

export enum MessageDirection {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
}

export enum ConversationStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface Integration {
  source: IntegrationSource;
}

export enum IntegrationSource {
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  MESSENGER = 'MESSENGER',
}
