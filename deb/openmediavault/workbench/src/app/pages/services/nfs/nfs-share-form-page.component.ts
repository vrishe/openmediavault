/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2021 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { FormPageConfig } from '~/app/core/components/intuition/models/form-page-config.type';

@Component({
  template: '<omv-intuition-form-page [config]="this.config"></omv-intuition-form-page>'
})
export class NfsShareFormPageComponent {
  public config: FormPageConfig = {
    request: {
      service: 'NFS',
      get: {
        method: 'getShare',
        params: {
          uuid: '{{ _routeParams.uuid }}'
        }
      },
      post: {
        method: 'setShare'
      }
    },
    fields: [
      {
        type: 'confObjUuid'
      },
      {
        type: 'sharedFolderSelect',
        name: 'sharedfolderref',
        label: gettext('Shared folder'),
        hint: gettext(
          'The location of the files to share. The share will be accessible at /export/<name>.'
        ),
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'uuid' }, arg1: '{{ newconfobjuuid }}' }
          }
        ],
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'client',
        label: gettext('Client'),
        hint: gettext('Clients allowed to mount the file system, e.g. 192.168.178.0/24.'),
        value: '',
        validators: {
          required: true
        }
      },
      {
        type: 'select',
        name: 'options',
        label: gettext('Privilege'),
        value: 'ro',
        store: {
          data: [
            ['ro', gettext('Read-only')],
            ['rw', gettext('Read/Write')]
          ]
        }
      },
      {
        type: 'textInput',
        name: 'extraoptions',
        label: gettext('Extra options'),
        hint: gettext(
          'Please check the <a href=\'http://linux.die.net/man/5/exports\' target=\'_blank\'>manual page</a> for more details.'
        ),
        value: 'subtree_check,insecure'
      },
      {
        type: 'textInput',
        name: 'comment',
        label: gettext('Comment'),
        value: ''
      },
      {
        type: 'hidden',
        name: 'mntentref',
        value: '{{ newconfobjuuid }}'
      }
    ],
    buttons: [
      {
        template: 'submit',
        execute: {
          type: 'url',
          url: '/services/nfs/shares'
        }
      },
      {
        template: 'cancel',
        execute: {
          type: 'url',
          url: '/services/nfs/shares'
        }
      }
    ]
  };
}
