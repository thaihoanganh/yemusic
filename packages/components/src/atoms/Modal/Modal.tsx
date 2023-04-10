import React from 'react';

import { modalStyles } from './Modal.css';

export interface ModalProps extends React.PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
	const handleClickOutside = () => {
		onClose();
	};

	if (isOpen) {
		return (
			<div className={modalStyles.root}>
				<div className={modalStyles.mask} onClick={handleClickOutside} />
				<div className={modalStyles.modalWrapper}>
					<div className={modalStyles.modal}>
						<div className={modalStyles.modalInner}>{children}</div>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
