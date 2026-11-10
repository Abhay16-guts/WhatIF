import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  toastMessage = 'Copied to clipboard',
}) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(toastMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      toast.error('Unable to copy text to clipboard.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded border border-paper-300 bg-paper-50 hover:bg-paper-200 text-ink-muted hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      aria-label={copied ? copiedLabel : label}
      title={label}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
          <span className="text-success font-medium">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-ink-faint" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

