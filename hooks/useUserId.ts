import { useEffect, useState } from 'react'
import { isLogin } from '../api/User'

export const useUserId = () => {
	const [userId, setUserId] = useState<number | null>(null)

	useEffect(() => {
		if (!window) {
			return
		}
		const userId = isLogin()
		if (userId > 0) {
			setUserId(userId)
		}
	}, [])

	return {
		userId,
		isLoggedIn: userId !== null
	}
}
