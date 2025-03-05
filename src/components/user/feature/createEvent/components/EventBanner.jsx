import UploadImage from '../../../../UploadImage';

const EventBanner = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Upload Event Banner</h2>
            <UploadImage name="eventBanner" />
        </div>
    );
};

export default EventBanner;
