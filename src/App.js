import React, { useState } from 'react';
import CelebrityManagementSystem from './components/CelebrityManagementSystem';
import './styles.scss';

function App() {
	return (
		<div className='flex justify-center'>
			<div className='w-2/5'>
				<CelebrityManagementSystem />
			</div>
		</div>
	);
}

export default App;
