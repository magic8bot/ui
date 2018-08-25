import './progress-steps.styl'

import React from 'react'

interface Step {
  label: string
  active: boolean
}

interface Props {
  steps: Step[]
}

export const ProgressSteps = ({ steps }: Props) => {
  const renderSteps = () => steps.map((step, idx) => renderStep(step, idx))

  const renderStep = ({ label, active }: Step, idx: number) => (
    <li key={idx} className={`${active ? 'active' : ''}`}>
      {label}
    </li>
  )

  return (
    <div className="progress-steps-container">
      <div className="progress-steps">{renderSteps()}</div>
    </div>
  )
}
