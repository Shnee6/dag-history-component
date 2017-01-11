import DagGraph from '@essex/redux-dag-history/lib/DagGraph';
import Bookmark from '../../util/Bookmark';

const log = require('debug')('dag-history-component:BookmarkActions');

export default function makeActions(
  rawSelectedBookmark: number,
  rawSelectedBookmarkDepth: number,
  history: any,
  onSelectBookmarkDepth,
  isPresenting: boolean,
) {
  const { bookmarks } = history;
  const graph = new DagGraph(history.graph);
  const { currentStateId } = graph;
  const bookmarkAt = (index: number) => {
    if (index < 0 || index >= bookmarks.length) {
      return null;
    }
    return new Bookmark(bookmarks[index], graph);
  }
  const jump = (index: number, depth: number) => {
    const target = bookmarkAt(index);
    const state = target.getStateAtDepth(depth);
    onSelectBookmarkDepth({ bookmarkIndex: index, depth, state });
  };
  const bookmarkIndex = rawSelectedBookmark !== undefined ?
    rawSelectedBookmark :
    Math.max(0, bookmarks.findIndex(it => it.stateId === currentStateId));
  const bookmark = bookmarkAt(bookmarkIndex);
  const depth = bookmark.sanitizeDepth(rawSelectedBookmarkDepth);

  const handleStepBack = () => {
    const isAtBookmarkStart = bookmark.isDepthAtStart(depth, isPresenting);
    const isAtBeginning = bookmarkIndex === 0 && isAtBookmarkStart;

    // We're at the start of the presentation, do nothing
    if (isAtBeginning) {
      return;
    }

    if (isAtBookmarkStart) {
      log('going to previous bookmark');
      jump(bookmarkIndex - 1, undefined);
      return;
    }

    log('decrementing depth in current bookmark');
    jump(bookmarkIndex, depth - 1);
  };

  const handleStepForward = () => {
    const isAtBookmarkEnd = bookmark.isDepthAtEnd(depth);
    const isAtLastBookmark = bookmarkIndex === bookmarks.length - 1;
    const isAtEnd = isAtLastBookmark && isAtBookmarkEnd;

    // We're at the end of the presentation, do nothing
    if (isAtEnd) {
      return;
    }

    // If we're not at the end of this bookmark, just increment the step
    if (!isAtBookmarkEnd) {
      log('incrementing depth in current bookmark');
      jump(bookmarkIndex, depth + 1);
      return;
    }

    // Go to the start of the next bookmark
    log('going to next bookmark');
    const nextBookmark = new Bookmark(bookmarks[bookmarkIndex + 1], graph);
    jump(bookmarkIndex + 1, nextBookmark.startingDepth(isPresenting));
  };

  const handleJumpToBookmark = (index: number) => jump(index, undefined);
  const handlePreviousBookmark = () => handleJumpToBookmark(Math.max(bookmarkIndex - 1, 0));
  const handleNextBookmark = () => handleJumpToBookmark(
    Math.min(bookmarkIndex + 1, bookmarks.length - 1),
  );
  const handleSkipToStart = () => handleJumpToBookmark(0);
  const handleSkipToEnd = () => handleJumpToBookmark(bookmarks.length - 1);

  return {
    handleStepBack,
    handleStepForward,
    handleNextBookmark,
    handlePreviousBookmark,
    handleSkipToStart,
    handleSkipToEnd,
  };
}
