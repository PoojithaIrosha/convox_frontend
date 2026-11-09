import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ConversationsService } from '../../services/conversations.service';
import {
  Conversation,
  ConversationStatus,
  IntegrationSource,
} from '../../models/conversation.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CursorPage } from '../../models/cursor-page.model';
import { InitialsPipe } from '../../pipe/initials.pipe';

interface LoadedPage {
  cursor: string | null;
  page: CursorPage<Conversation>;
}

@Component({
  imports: [InitialsPipe],
  selector: 'app-inbox',
  styleUrl: './inbox.css',
  templateUrl: './inbox.html',
})
export class Inbox {
  private readonly conversationsService = inject(ConversationsService);
  private readonly limit = 20;

  readonly status = signal<ConversationStatus>(ConversationStatus.OPEN);
  private readonly cursor = linkedSignal<ConversationStatus, string | null>({
    source: this.status,
    computation: () => null,
  });

  private readonly pageResource = rxResource({
    params: () => ({ status: this.status(), cursor: this.cursor() }),
    stream: ({ params }) =>
      this.conversationsService
        .getConversations(params.status.toString(), this.limit, params.cursor)
        .pipe(map((page): LoadedPage => ({ cursor: params.cursor, page }))),
  });

  readonly conversations = linkedSignal<LoadedPage | undefined, Conversation[]>({
    source: () => (this.pageResource.hasValue() ? this.pageResource.value() : undefined),
    computation: (loaded, prev) => {
      if (!loaded) return prev?.value ?? [];
      return loaded.cursor ? [...(prev?.value ?? []), ...loaded.page.items] : loaded.page.items;
    },
  });

  readonly loading = this.pageResource.isLoading;
  readonly error = this.pageResource.error;
  readonly hasMore = computed(() =>
    this.pageResource.hasValue() ? this.pageResource.value().page.hasMore : false,
  );

  loadMore() {
    if (this.loading() || !this.pageResource.hasValue()) return;
    const { page } = this.pageResource.value();
    if (page.hasMore && page.nextCursor) this.cursor.set(page.nextCursor);
  }

  retry() {
    this.pageResource.reload();
  }

  protected readonly IntegrationSource = IntegrationSource;
}
