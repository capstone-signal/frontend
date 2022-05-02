import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
  } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient, setQueryClient] = useState<QueryClient>(
		() => new QueryClient()
	)

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps}></Component>
			</Hydrate>
		</QueryClientProvider>
		
	)
}

export default MyApp
