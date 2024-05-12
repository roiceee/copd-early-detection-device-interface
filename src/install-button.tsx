import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed',
      platform: string
    }>;
    prompt(): Promise<void>;
  }

export default function InstallPWA() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const showDiv = useCallback(() => {
    setShow(true);
  }, []);

  const installApp = useCallback(async () => {
    if (deferredPrompt.current !== null) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") {
        deferredPrompt.current = null;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
      showDiv();
    deferredPrompt.current = e as BeforeInstallPromptEvent;
    });
  }, [showDiv]);

  return (
    show && (
      <section className="mt-2" onClick={installApp}>
        <button className=" btn btn-info">
          <b>Install as an App</b>
        </button>
      </section>
    )
  );
}
