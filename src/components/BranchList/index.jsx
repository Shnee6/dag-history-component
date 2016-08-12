import React, { PropTypes } from 'react';
import Branch from '../Branch';
const DO_NOTHING = () => ({});
import './BranchList.scss';

const BranchList = ({
  activeBranch,
  branches,
  onBranchClick,
  onBranchContinuationClick,
}) => {
  const branchViews = branches.map(s => (
    <Branch
      {...s}
      key={`branch:${s.id}`}
      onClick={() => (onBranchClick || DO_NOTHING)(s.id)}
      onContinuationClick={() => (onBranchContinuationClick || DO_NOTHING)(s.id)}
      active={activeBranch === s.id}
    />
  ));
  return (
    <div className="history-branch-list">
      <div className="history-branch-list-inner">
        {branchViews}
      </div>
    </div>
  );
};

BranchList.propTypes = {
  activeBranch: PropTypes.number.isRequired,
  onBranchClick: PropTypes.func,
  onBranchContinuationClick: PropTypes.func,
  branches: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    activeStateIndex: PropTypes.number,
    continuation: PropTypes.shape({
      numContinuations: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    }),
    startsAt: PropTypes.number.isRequired,
    endsAt: PropTypes.number.isRequired,
    currentBranchStart: PropTypes.number,
    currentBranchEnd: PropTypes.number,
    maxDepth: PropTypes.number.isRequired,
    branchType: PropTypes.oneOf(['current', 'legacy']).isRequired,
  })).isRequired,
};

export default BranchList;
