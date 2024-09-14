import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CelebrityList from './CelebrityList';
import { fetchCelebrities } from '../utils/api';
import { calculateAge } from '../utils/helpers';

const CelebrityManagementSystem = () => {
	const [celebrities, setCelebrities] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		fetchCelebrities().then((data) => {
			const celebsData = data.map((celeb) => ({
				...celeb,
				age: calculateAge(celeb.dob),
				prefferedName: `${celeb.first} ${celeb.last}`,
			}));
			setCelebrities(celebsData);
		});
	}, []);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredCelebrities = celebrities.filter((celeb) =>
		`${celeb.first} ${celeb.last}`
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	return (
		<div className='p-4'>
			<div className='mb-4 flex border rounded-lg items-center pl-2'>
				<Search className='top-2.5 text-gray-400' />
				<input
					type='text'
					placeholder='Search user'
					value={searchTerm}
					onChange={handleSearch}
					className='p-2 w-full outline-0'
				/>
			</div>
			<CelebrityList
				celebrities={filteredCelebrities}
				setCelebrities={setCelebrities}
			/>
		</div>
	);
};

export default CelebrityManagementSystem;
