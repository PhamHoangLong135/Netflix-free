import './details.scss';
import { useRef } from 'react';
import { staggerOne, modalOverlayVariants, modalVariants, modalFadeInUpVariants } from "../../motionUtils";
import { hideModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectModalContent, selectModalState } from "../../redux/modal/modal.selectors";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutSideClick";

const DetailModal = () => {
	const dispatch = useDispatch();
	const modalClosed = useSelector(selectModalState);
	const modalContent = useSelector(selectModalContent);
	const handleModalClose = () => dispatch(hideModalDetail());
	const modalRef = useRef();


	// const handlePlayAnimation = event => {
	// 	event.stopPropagation();
	// 	handleModalClose();
	// };
	useOutsideClick(modalRef, () => {
		if (!modalClosed) handleModalClose();
	});

	return (
		<AnimatePresence exitBeforeEnter>
		{!modalClosed && (
				<>
					<motion.div
						variants={modalOverlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						key="modalOverlay"
						className={`Modal__overlay ${modalClosed && 'Modal__invisible'}`}
					>
						<motion.div
							key="modal"
							variants={modalVariants}
							ref={modalRef}
							className={`Modal__wrp ${modalClosed && 'Modal__invisible'}
                             `}
						>
							<motion.button
								className="Modal__closebtn"
								onClick={handleModalClose}
							>
								<VscChromeClose />
							</motion.button>
							<div className="Modal__image--wrp">
								<div className="Modal__image--shadow" />
								<img
									className="Modal__image--img"
									src={modalContent.imgSm}
									alt="img "
								/>
								<div className="Modal__image--buttonswrp">
									<Link
										className="Modal__image--button"
										onClick={handleModalClose}
										to={{ pathname: "/watch", movie: modalContent }}
									>
										<FaPlay />
										<span>Play</span>
									</Link>
								</div>
							</div>
							<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit" className="Modal__info--wrp">
								<motion.h3 variants={modalFadeInUpVariants} className="Modal__info--title">{modalContent.title}</motion.h3>
								<motion.p variants={modalFadeInUpVariants} className="Modal__info--description">{modalContent.desc}</motion.p>
								<motion.hr variants={modalFadeInUpVariants} className="Modal__info--line"/>
								<motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">Info on <b>{modalContent.title}</b></motion.h4>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Genres: {modalContent.genre}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>
										Year: {modalContent.year}
									</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>{modalContent.limit}</span>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				</>
		)}
		</AnimatePresence>
	)
}

export default DetailModal