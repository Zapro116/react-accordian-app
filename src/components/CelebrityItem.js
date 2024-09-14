import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
	ChevronDown,
	ChevronUp,
	CircleCheck,
	CircleX,
	Edit2,
	Trash2,
} from 'lucide-react';
import Modal from './Modal';

const CelebrityItem = React.memo(
	({
		celebrity,
		isOpen,
		toggleAccordion,
		editMode,
		setEditMode,
		handleDelete,
		setCelebrities,
	}) => {
		const [editedCelebrity, setEditedCelebrity] = useState(null);
		const [isModalOpen, setIsModalOpen] = useState(false);
		const celebNameRef = useRef(null);
		const initialCelebrityRef = useRef(celebrity);

		const isChanged = useMemo(() => {
			if (!editedCelebrity) return false;
			return Object.keys(initialCelebrityRef.current).some(
				(key) => initialCelebrityRef.current[key] !== editedCelebrity[key]
			);
		}, [editedCelebrity]);

		const handleEdit = useCallback(() => {
			if (celebrity.age >= 18) {
				setEditMode(celebrity.id);
				setEditedCelebrity({ ...celebrity });
			} else {
				alert('You can only edit adult celebrities.');
			}
		}, [celebrity, setEditMode]);

		const handleSave = useCallback(() => {
			if (isChanged) {
				setCelebrities((prevCelebrities) =>
					prevCelebrities.map((celeb) =>
						celeb.id === editedCelebrity.id
							? {
									...editedCelebrity,
									prefferedName: celebNameRef.current.value,
							  }
							: celeb
					)
				);
			}
			setEditMode(null);
			setEditedCelebrity(null);
		}, [editedCelebrity, setCelebrities, setEditMode, isChanged]);

		const handleCancel = useCallback(() => {
			setEditMode(null);
			setEditedCelebrity(null);
		}, [setEditMode]);

		const handleChange = useCallback((e, field) => {
			const value =
				e.target.type === 'number' ? Number(e.target.value) : e.target.value;
			setEditedCelebrity((prev) => {
				if (prev[field] === value) return prev;
				return { ...prev, [field]: value };
			});
		}, []);

		const isEditValid = useMemo(() => {
			if (!editedCelebrity) return false;
			const { country, description, age } = editedCelebrity;
			return (
				country?.trim() !== '' &&
				description?.trim() !== '' &&
				!isNaN(age) &&
				isNaN(country)
			);
		}, [editedCelebrity]);

		return (
			<div className='mb-2 border rounded-lg'>
				<div
					className='flex items-center justify-between p-3 cursor-pointer'
					onClick={() => toggleAccordion(celebrity.id)}
				>
					<div className='flex items-center'>
						<img
							src={celebrity.picture}
							alt={`${celebrity.first} ${celebrity.last}`}
							className='w-10 h-10 rounded-full mr-3'
						/>
						{editMode === celebrity.id ? (
							<input
								defaultValue={celebrity.prefferedName}
								className='p-2 border rounded w-full'
								ref={celebNameRef}
								onChange={(e) => handleChange(e, 'prefferedName')}
							/>
						) : (
							<span>{celebrity.prefferedName}</span>
						)}
					</div>
					{isOpen ? <ChevronUp /> : <ChevronDown />}
				</div>
				{isOpen && (
					<div className='p-3'>
						{editMode === celebrity.id ? (
							<>
								<div className='grid grid-cols-3 gap-4 mb-4'>
									<div>
										<div>Age</div>
										<input
											type='number'
											value={editedCelebrity.age}
											className='p-2 border rounded w-full'
											placeholder='Age'
											onChange={(e) => handleChange(e, 'age')}
										/>
									</div>
									<div>
										<div>Gender</div>
										<select
											value={editedCelebrity.gender}
											onChange={(e) => handleChange(e, 'gender')}
											className='p-2 border rounded w-full'
										>
											<option value='male'>Male</option>
											<option value='female'>Female</option>
											<option value='transgender'>Transgender</option>
											<option value='rather not say'>Rather not say</option>
											<option value='other'>Other</option>
										</select>
									</div>
									<div>
										<div>Country</div>
										<input
											type='text'
											value={editedCelebrity.country}
											onChange={(e) => handleChange(e, 'country')}
											className='p-2 border rounded w-full'
											placeholder='Country'
										/>
									</div>
								</div>
								<div className='mb-4'>
									<div>Description</div>
									<textarea
										value={editedCelebrity.description}
										onChange={(e) => handleChange(e, 'description')}
										className='w-full p-2 border rounded mb-4'
										rows='4'
										placeholder='Description'
									/>
								</div>
								<div className='flex justify-end'>
									<button
										onClick={handleCancel}
										className='mr-2 p-2 text-red-500 rounded'
									>
										<CircleX />
									</button>
									<button
										onClick={handleSave}
										className={`p-2 rounded ${
											isEditValid && isChanged
												? 'text-green-500'
												: 'text-gray-300 cursor-not-allowed'
										}`}
										disabled={!isChanged || !isEditValid}
									>
										<CircleCheck />
									</button>
								</div>
							</>
						) : (
							<>
								<div className='grid grid-cols-3 gap-4 mb-4'>
									<div>
										<div>Age</div>
										<div className='capitalize'>{celebrity.age}</div>
									</div>
									<div>
										<div>Gender</div>
										<div className='capitalize'>{celebrity.gender}</div>
									</div>
									<div>
										<div>Country</div>
										<div className='capitalize'>{celebrity.country}</div>
									</div>
								</div>
								<div className='mb-4'>
									<div>Description</div>
									<p>{celebrity.description}</p>
								</div>
								<div className='flex justify-end'>
									<button
										onClick={() => setIsModalOpen(true)}
										className='mr-2 p-2 text-red-500 rounded'
									>
										<Trash2 />
									</button>
									<button
										onClick={handleEdit}
										className='p-2 text-blue-500 rounded'
									>
										<Edit2 />
									</button>
								</div>
							</>
						)}
					</div>
				)}
				<Modal
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
					}}
					title='Are you sure you want to delete?'
					childWrapperClass='flex flex-row-reverse mt-7'
				>
					<button
						onClick={() => {
							handleDelete(celebrity.id);
							setIsModalOpen(true);
						}}
						className='p-2 bg-red-500 text-white border rounded-lg px-5'
					>
						Delete
					</button>
					<button
						onClick={() => setIsModalOpen(false)}
						className='mr-2 p-2 border rounded-lg px-5'
					>
						Cancel
					</button>
				</Modal>
			</div>
		);
	}
);

export default CelebrityItem;
