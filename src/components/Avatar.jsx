import React from 'react'
import defaultImg from '../../public/default-avatar.png'
import { DropdownArrow } from '../icon/index'

function Avatar(props) {
	const {imgSrc, menu, ...restProps} = props
	return (
		<div className='avatar items-center cursor-pointer'>
			<div {...restProps}>
				<img src={imgSrc ? imgSrc : defaultImg} alt="avatar" 
				onError={(e) => e.target.src = defaultImg}
				/>
			</div>
			{ menu && 
			<DropdownArrow className="absolute -bottom-2 -right-1 w-4" />

			}
		</div>
	)
}

export default Avatar