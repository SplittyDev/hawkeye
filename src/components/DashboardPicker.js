import styled from 'styled-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useCallback, useState } from 'react'
import { FiCheckSquare, FiEdit2, FiPlusSquare, FiTrash2, FiXSquare } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

import { dashboardsState, selectedDashboardState, DEFAULT_DASHBOARD_UUID } from 'state/atoms'
import cloneDeep from 'lodash.clonedeep'
import { isNil } from 'lodash'

const DashboardCell = ({ className, dashboard }) => {
  const [selectedDashboard, setSelectedDashboard] = useRecoilState(selectedDashboardState)
  const [dashboards, setDashboards] = useRecoilState(dashboardsState)
  const [name, setName] = useState(dashboard.name)
  const [isEditing, setIsEditing] = useState(false)

  const handleDashboardSwitch = useCallback(() => {
    setSelectedDashboard(dashboard.uuid)
  }, [dashboard, setSelectedDashboard])

  const isActive = selectedDashboard === dashboard.uuid
  const additionalClassName = [isActive ? 'active' : ''].join(' ').trim()
  const combinedClassNames = [className, additionalClassName].join(' ').trim()

  const enterEditMode = () => {
    setIsEditing(true)
  }

  const cancelEditMode = () => {
    setName(dashboard.name)
    setIsEditing(false)
  }

  const saveDashboard = () => {
    const clonedDashboards = cloneDeep(dashboards)
    const index = clonedDashboards.findIndex(db => db.uuid === dashboard.uuid)
    if (!isNil(index)) {
      clonedDashboards[index] = {
        ...dashboard,
        name
      }
      setDashboards(clonedDashboards)
    }
    setIsEditing(false)
  }

  const deleteDashboard = () => {
    setDashboards(dashboards.filter(db => db.uuid !== dashboard.uuid))
  }

  return (
    <div className={combinedClassNames} onClick={() => handleDashboardSwitch()}>
      { !isEditing && (
        <div className="name">
          {dashboard.name}
        </div>
      )}
      { isEditing && (
        <input type="text" size={name.length + 1} value={name} onInput={e => setName(e.target.value)} />
      )}
      <div className="icons">
        { !isEditing && (
          <>
            <FiEdit2 className="icon icon--edit" size={24} onClick={() => enterEditMode()} />
            { dashboard.uuid !== DEFAULT_DASHBOARD_UUID && (
              <FiTrash2 className="icon icon--delete" size={24} onClick={() => deleteDashboard()} />
            )}
          </>
        )}
        { isEditing && (
          <>
            <FiCheckSquare className="icon icon--create" size={36} onClick={() => saveDashboard()} />
            <FiXSquare className="icon icon--cancel" size={36} onClick={() => cancelEditMode()} />
          </>
        )}
      </div>
    </div>
  )
}

const DashboardCellStyled = styled(DashboardCell)`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.dashboardTitleFontSize};
  opacity: .55;
  cursor: pointer;
  padding: 0 .5rem;

  & input[type="text"] {
    appearance: none;
    padding: 0 .5rem;
    border: none;
    outline: none;
    font-size: ${props => props.theme.dashboardTitleFontSize};
    background-color: ${props => props.theme.pageBackgroundColor};
    color: ${props => props.theme.pageForegroundColor};
    border-bottom: .2rem solid hsl(0,0%,50%);
  }

  & .name {
    padding: 0 .5rem;
    border-bottom: .2rem solid hsla(0,0%,50%,0);
  }

  &.active .name {
    border-bottom: .2rem solid hsla(0,0%,50%,1);
  }

  &.active {
    opacity: 1;
  }

  &:not(.active):hover .name {
    opacity: 1;
    border-bottom: .2rem solid hsla(0,0%,50%,.5);
  }

  &.active .icons {
    display: flex;
  }

  & .icons {
    display: none;
    align-items: center;
    margin-left: .5rem;

    & .icon {
      cursor: pointer;
      opacity: .25;
      margin-left: .25rem;

      &:hover {
        opacity: 1;
      }

      &.icon--create {
        padding: 0 .25rem;
        opacity: 0.5;
        color: hsl(150,50%,50%);

        &:hover {
          opacity: 1;
        }
      }

      &.icon--cancel {
        padding: 0 .25rem;
        opacity: 0.75;
        color: hsl(0,50%,50%);

        &:hover {
          opacity: 1;
        }
      }
    }

  }
`

const NewDashboardCell = ({ className }) => {
  const [name, setName] = useState('Unnamed')
  const [isEditing, setIsEditing] = useState(false)
  const [dashboards, setDashboards] = useRecoilState(dashboardsState)

  const enterEditMode = () => {
    if (!isEditing) {
      setIsEditing(true)
    }
  }

  const cancelEditMode = () => {
    setIsEditing(false)
    setName('Unnamed')
  }

  const saveDashboard = () => {
    const dashboard = {
      uuid: uuidv4(),
      name,
      widgets: [],
    }
    setDashboards([...dashboards, dashboard])
    cancelEditMode()
  }

  return (
    <div className={className} onClick={() => enterEditMode()}>
      { !isEditing && <FiPlusSquare className="icon--new" size={32} /> }
      { isEditing && (
        <>
          <input type="text" size={name.length + 1} value={name} onInput={e => setName(e.target.value)} />
          <FiCheckSquare className="icon--create" size={40} onClick={() => saveDashboard()} />
          <FiXSquare className="icon--cancel" size={40} onClick={() => cancelEditMode()} />
        </>
      )}
    </div>
  )
}

const NewDashboardCellStyled = styled(NewDashboardCell)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: hsl(150,0%,50%);
  cursor: pointer;
  padding: 0 1rem;

  & input[type="text"] {
    appearance: none;
    padding: 0 .5rem;
    border: none;
    outline: none;
    font-size: ${props => props.theme.dashboardTitleFontSize};
    background-color: ${props => props.theme.pageBackgroundColor};
    color: ${props => props.theme.pageForegroundColor};
    border-bottom: .2rem solid hsl(0,0%,50%);
  }

  &:hover .icon--new {
    opacity: 1;
    color: hsl(150,50%,50%);
  }

  & .icon--create {
    padding: 0 .25rem;
    opacity: 0.5;
    color: hsl(150,50%,50%);

    &:hover {
      opacity: 1;
    }
  }

  & .icon--cancel {
    padding: 0 .25rem;
    opacity: 0.75;
    color: hsl(0,50%,50%);

    &:hover {
      opacity: 1;
    }
  }
`

const DashboardPicker = ({ className }) => {
  const dashboards = useRecoilValue(dashboardsState)

  return (
    <div className={className}>
      { dashboards.map(dashboard => <DashboardCellStyled dashboard={dashboard} key={dashboard.uuid} />) }
      <NewDashboardCellStyled />
    </div>
  )
}

export default styled(DashboardPicker)`
display: flex;
flex-flow: row nowrap;
`
