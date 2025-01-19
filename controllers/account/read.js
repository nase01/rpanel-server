import { Avatar } from '../../models/mongoose/Avatar.js'

export const adminAvatarFetchMany = async (req, res) => {
  try {
    
		const self = req.currentAdmin

    const avatar = await Avatar
		.find({ adminId: self.id })
		.select('-_id imageUrl createdAt')
		.lean()

    return res.status(200).json({ data: avatar })
  } catch (error) {
    return res.status(500).json({ errors: [{ status: '500', detail: 'Internal Server Error' }] })
  }
}
