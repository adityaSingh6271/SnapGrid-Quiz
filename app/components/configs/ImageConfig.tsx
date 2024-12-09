interface ImageConfigProps {
  config?: {
    url: string;
    alt: string;
  };
  onChange: (config: NonNullable<ImageConfigProps["config"]>) => void;
}

export function ImageConfig({ config, onChange }: ImageConfigProps) {
  const currentConfig = config || {
    url: "",
    alt: "",
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          value={currentConfig.url}
          onChange={(e) =>
            onChange({ ...currentConfig, url: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alt Text
        </label>
        <input
          type="text"
          value={currentConfig.alt}
          onChange={(e) =>
            onChange({ ...currentConfig, alt: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Descriptive text for the image"
        />
      </div>

      {currentConfig.url && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="border border-gray-200 rounded-lg p-2">
            <img
              src={currentConfig.url}
              alt={currentConfig.alt}
              className="max-w-full h-auto rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}