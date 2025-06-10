import { useState } from 'react';
import { Modal, ActionIcon } from '@mantine/core';

export default function HelpModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ActionIcon
        variant="subtle"
        color="grape"
        aria-label="Open help dialog"
        onClick={() => setOpened(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 10a1 1 0 112 0v5a1 1 0 11-2 0v-5zm1-4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
            clipRule="evenodd"
          />
        </svg>
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Site help"
        size="sm"
        centered
      >
        <p className="mb-2">Use the navigation links above to explore each unit and the glossary.</p>
        <p className="mb-2">Toggle dark mode for a comfortable viewing experience.</p>
        <p>Press Esc or click outside this box to close.</p>
      </Modal>
    </>
  );
}
