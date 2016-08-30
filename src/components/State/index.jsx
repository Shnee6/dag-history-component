import React, { PropTypes } from 'react';
import ItemInfo from '../ItemInfo';
import { colors } from '../../palette';
import EmptyBookmark from 'react-icons/lib/io/ios-location';
import Bookmark from 'react-icons/lib/io/ios-location';

const coloring = {
  current: {
    active: colors.CURRENT_ACTIVE,
    nonactive: colors.CURRENT,
  },
  legacy: {
    active: colors.LEGACY_ACTIVE,
    nonactive: colors.ANCESTOR,
  },
  pinned: colors.SUCCESSOR_PIN,
  successor: colors.SUCCESSOR_ACTIVE,
};
const DO_NOTHING = () => ({});

function getBackgroundColor(isPinned, isSuccessor, branchType, active) {
  let result = null;
  if (isPinned) {
    result = coloring.pinned;
  } else if (isSuccessor) {
    result = coloring.successor;
  } else {
    result = coloring[branchType][active ? 'active' : 'nonactive'];
  }
  return result;
}

const State = ({
  label,
  branchType,
  active,
  continuationActive,
  renderBookmarks,
  bookmarked,
  continuation,
  onClick,
  onContinuationClick,
  onBookmarkClick,
  isPinned,
  isSuccessor,
}) => {
  const backgroundColor = getBackgroundColor(isPinned, isSuccessor, branchType, active);
  let bookmark = null;
  if (renderBookmarks) {
    bookmark = bookmarked ?
      <Bookmark color="gold" onClick={onBookmarkClick || DO_NOTHING} /> :
      <EmptyBookmark color="#E8E8E8" onClick={onBookmarkClick || DO_NOTHING} />;
  }
  return (
    <div className="history-state" style={{ backgroundColor }} onClick={onClick || DO_NOTHING}>
      <ItemInfo
        label={label}
        continuation={continuation}
        onContinuationClick={onContinuationClick || DO_NOTHING}
        active={active}
        continuationActive={continuationActive}
      />
      {bookmark}
    </div>
  );
};

State.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  continuationActive: PropTypes.bool,
  bookmarked: PropTypes.bool,
  renderBookmarks: PropTypes.bool,
  branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  isPinned: PropTypes.bool,
  isSuccessor: PropTypes.bool,
  continuation: PropTypes.shape({
    numContinuations: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
  onBookmarkClick: PropTypes.func,
  onClick: PropTypes.func,
  onContinuationClick: PropTypes.func,
};

export default State;
