import React, { useState } from 'react';
import CelebrityItem from './CelebrityItem.js';

const CelebrityList = ({ celebrities, setCelebrities }) => {
	const [openAccordion, setOpenAccordion] = useState(null);
	const [editMode, setEditMode] = useState(null);

	const toggleAccordion = (id) => {
		if (editMode === null) {
			setOpenAccordion(openAccordion === id ? null : id);
		}
	};

	const handleDelete = (id) => {
		setCelebrities(celebrities.filter((celeb) => celeb.id !== id));
		setOpenAccordion(null);
	};

	return (
		<div>
			{celebrities.map((celeb) => (
				<CelebrityItem
					key={celeb.id}
					celebrity={celeb}
					isOpen={openAccordion === celeb.id}
					toggleAccordion={toggleAccordion}
					editMode={editMode}
					setEditMode={setEditMode}
					handleDelete={handleDelete}
					setCelebrities={setCelebrities}
				/>
			))}
		</div>
	);
};

export default CelebrityList;
