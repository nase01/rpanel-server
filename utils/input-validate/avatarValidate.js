
import { customValidator } from '../custom-validator/index.js'

export const avatarValidate = async (input) => {

  if (input.imageUrl == "") {
		return { error: 'imageUrl is required' }
  }

  if (!customValidator.isValidUrl(input.imageUrl)) {
		return { error: 'Invalid imageUrl' }
  }

  return true
}
