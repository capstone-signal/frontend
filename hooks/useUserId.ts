import { useEffect, useState } from 'react'
import { isLogin } from '../api/User'

export const useUserId = () => {
	const [userId, setUserId] = useState<number | null>(null)
	const [init, setInit] = useState<boolean>(false)

	useEffect(() => {
		if (!window) {
			return
		}
		const userId = isLogin()
		if (userId > 0) {
			setUserId(userId)
		}
		setInit(true)
	}, [])

	return {
		userId,
		isLoggedIn: userId !== null,
		init
	}
}
