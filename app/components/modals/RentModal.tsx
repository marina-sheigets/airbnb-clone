'use client';
import { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { CATEGORIES } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

function RentModal() {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const category = watch('category');
	const rentModal = useRentModal();

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};
	const [step, setStep] = useState(STEPS.CATEGORY);

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		return step === STEPS.PRICE ? 'Create' : 'Next';
	}, [step]);

	const secondaryLabel = useMemo(() => {
		return step === STEPS.CATEGORY ? undefined : 'Back';
	}, [step]);

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading title='Which of these best describes your place?' subtitle='Pick a category' />
			<div
				className='
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            '>
				{CATEGORIES.flatMap((item) => (
					<div key={item.label} className='col-span-1'>
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);
	return (
		<Modal
			onSubmit={rentModal.onClose}
			actionLabel={actionLabel}
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			secondaryActionLabel={secondaryLabel}
			title='Airbnb your home !'
			body={bodyContent}
			disabled={!category}
		/>
	);
}

export default RentModal;