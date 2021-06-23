import React from 'react'
import { useSelector } from 'react-redux'
import { useToast } from 'state/hooks'
import { State } from 'state/types'
import ToastContainer from './ToastContainer'
import { Toast } from './types'

const ToastListener = () => {
  const toasts: Toast[] = useSelector((state: State) => state.toasts.data)
  const { remove } = useToast()

  const handleRemove = (id: string) => remove(id)

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener
