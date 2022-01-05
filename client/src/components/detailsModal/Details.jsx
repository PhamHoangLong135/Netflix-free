import './details.scss';
import { useRef } from 'react';
import { staggerOne, modalOverlayVariants, modalVariants, modalFadeInUpVariants } from "../../motionUtils";
// import { selectModalContent, selectModalState } from "../../redux/modal/modal.selectors";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";


const DetailModal = () => {
	// const dispatch = useDispatch();
	// const modalClosed = useSelector(selectModalState);
	// const modalContent = useSelector(selectModalContent);
	// const handleModalClose = () => dispatch(hideModalDetail());
	// const { title, desc, genre} = modalContent;
	// const joinedGenres = genresConverted ? genresConverted.join(', ') : "Not available";
	// const maturityRating = adult === undefined ? "Not available" : adult ? "Suitable for adults only" : "Suitable for all ages";
	// const reducedDate = release_date ? dateToYearOnly(release_date) : first_air_date ? dateToYearOnly(first_air_date) : "Not Available";
	const modalRef = useRef();


	// const handleAdd = (event) => {
	// 	event.stopPropagation();
	// 	dispatch(addToFavourites({ ...modalContent, isFavourite }));
	// }
	// const handleRemove = (event) => {
	// 	event.stopPropagation();
	// 	dispatch(removeFromFavourites({ ...modalContent, isFavourite }));
	// 	if (!modalClosed) handleModalClose();
	// }
	// const handlePlayAnimation = event => {
	// 	event.stopPropagation();
	// 	handleModalClose();
	// };
	// useOutsideClick(modalRef, () => {
	// 	if (!modalClosed) handleModalClose();
	// });

	return (
		<AnimatePresence exitBeforeEnter>
		
				<>
					<motion.div
						variants={modalOverlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						key="modalOverlay"
						className={`Modal__overlay `}
					>
						<motion.div
							key="modal"
							variants={modalVariants}
							ref={modalRef}
							className={`Modal__wrp
                             `}
						>
							<motion.button
								className="Modal__closebtn"
								// onClick={handleModalClose}
							>
								<VscChromeClose />
							</motion.button>
							<div className="Modal__image--wrp">
								<div className="Modal__image--shadow" />
								<img
									className="Modal__image--img"
									src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/12/16/800500-1-1639669631931545455159.jpg"
									alt="img "
								/>
								<div className="Modal__image--buttonswrp">
									<Link
										className="Modal__image--button"
										// onClick={handlePlayAnimation}
										to={'/play'}
									>
										<FaPlay />
										<span>Play</span>
									</Link>
									{/* {!isFavourite
										? (
											<button className='Modal__image--button-circular' onClick={handleAdd}>
												<FaPlus />
											</button>
										): (
											<button className='Modal__image--button-circular' onClick={handleRemove}>
												<FaMinus />
											</button>
										)} */}
								</div>
							</div>
							<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit" className="Modal__info--wrp">
								<motion.h3 variants={modalFadeInUpVariants} className="Modal__info--title">title</motion.h3>
								<motion.p variants={modalFadeInUpVariants} className="Modal__info--description">desc</motion.p>
								<motion.hr variants={modalFadeInUpVariants} className="Modal__info--line"/>
								<motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">Info on <b>title</b></motion.h4>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Genres: </span>
									{/* <span className="Modal__info--row-description">{joinedGenres}</span> */}
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>
										{/* {release_date ? "Release date: " : "First air date: "} */}
									</span>
									{/* <span className="Modal__info--row-description">{reducedDate}</span> */}
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Average vote: </span>
									{/* <span className="Modal__info--row-description">{vote_average || "Not available"}</span> */}
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Original language: </span>
									{/* <span className="Modal__info--row-description">{capitalizeFirstLetter(original_language)}</span> */}
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Age classification: </span>
									{/* <span className="Modal__info--row-description">{maturityRating}</span> */}
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				</>
		</AnimatePresence>
	)
}

export default DetailModal