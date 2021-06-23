import { useMemo } from 'react'
import { kebabCase } from 'lodash'
import { useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import { Toast, types as toastTypes } from 'components/ToastListener/types'
import { State } from './types'
import {
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
} from './actions'

// Presale
export const usePresales = () => {
  const presales = useSelector((state: State) => state.presale.data.stages)
  return presales
}

export const usePresaleFromStage = (curStage: number) => {
  const presale = useSelector((state: State) => state.presale.data.stages.filter(stage => stage.stage === curStage))
  return presale.length > 0 ? presale[0] : {}
}

export const usePresaleStatus = () => {
  const info = useSelector((state: State) => {
    const stage = state.presale.data.stages.filter(s => s.stage === state.presale.data.curStage)
    return {
      started: state.presale.data.started,
      openTime: state.presale.data.openTime,
      endTime: state.presale.data.endTime,
      closed: state.presale.data.closed,
      curStage: state.presale.data.curStage,
      totalSold: state.presale.data.totalSold,
      soldAmount: state.presale.data.soldAmount,
      cap: stage.length > 0 ? stage[0].cap : 0,
      bonus: stage.length > 0 ? stage[0].bonus : 0,
      rate: stage.length > 0 ? stage[0].rate : 60,
    }
  })
  return info
}

// Toasts
export const useToast = () => {
  const dispatch = useAppDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))
    return {
      toastError: (title: string, description?: string) => {
        // eslint-disable-next-line
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        // eslint-disable-next-line
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        // eslint-disable-next-line
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        // eslint-disable-next-line
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}
