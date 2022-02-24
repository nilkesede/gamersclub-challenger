import '../../plugins/window.setup'
import serializer from '../../scripts/lobby/serializer'
import { gcSelectors } from '../gcSelectors'

if(process.env.NODE_ENV === 'development'){
  window.gcc = { gcSelectors, serializer }
}
