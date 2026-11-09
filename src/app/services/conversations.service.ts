import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Conversation } from '../models/conversation.model';
import { CursorPage } from '../models/cursor-page.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConversationsService {
  private readonly http = inject(HttpClient);

  getConversations(
    status: string,
    limit: number,
    cursor: string | null,
  ): Observable<CursorPage<Conversation>> {
    let params = new HttpParams().set('status', status).set('limit', limit);
    if (cursor) params = params.set('cursor', cursor);
    return this.http.get<CursorPage<Conversation>>('conversation', { params });
  }
}
