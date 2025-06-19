import React from 'react';

export default function DateFormatter(date) {
  return date.replace(/-/g, '/')
}
