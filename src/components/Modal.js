import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, childWrapperClass }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<div>{title}</div>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700'
					>
						<X size={24} />
					</button>
				</div>
				<div className={childWrapperClass}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
